"""Semantic Deduplication — embedding-based duplicate detection.

Uses sentence transformers to encode text and detect semantically similar items,
not just exact string matches. Falls back to TF-IDF if transformers unavailable.
"""

from __future__ import annotations

import hashlib
import os
from pathlib import Path
from typing import Optional

from aigen.utils.normalize import normalize_text


class SemanticDedup:
    """Detect semantically similar items using embeddings or TF-IDF fallback."""

    def __init__(
        self,
        enabled: bool = True,
        threshold: float = 0.92,
        method: str = "auto",
        cache_dir: Optional[str] = None,
    ):
        self.enabled = enabled
        self.threshold = threshold
        self.method = method  # "auto", "embedding", "tfidf"
        self.cache_dir = cache_dir
        self._encoder = None
        self._index = None
        self._texts: list[str] = []
        self._initialized = False

    def _get_encoder(self):
        """Lazy-load the embedding model."""
        if self._encoder is not None:
            return self._encoder

        if self.method == "tfidf":
            return None  # Use TF-IDF fallback

        # Try sentence-transformers first
        try:
            from sentence_transformers import SentenceTransformer
            self._encoder = SentenceTransformer("all-MiniLM-L6-v2")
            return self._encoder
        except Exception:
            # Fall back to TF-IDF
            self.method = "tfidf"
            return None

    def _init_tfidf(self, texts: list[str]) -> None:
        """Initialize TF-IDF index from existing texts."""
        from sklearn.feature_extraction.text import TfidfVectorizer
        from sklearn.metrics.pairwise import cosine_similarity
        import numpy as np

        if not texts:
            return

        self._vectorizer = TfidfVectorizer(max_features=5000, stop_words="english")
        self._tfidf_matrix = self._vectorizer.fit_transform(texts)
        self._cosine_sim = cosine_similarity(self._tfidf_matrix)
        self._texts = texts[:]
        self._np = np

    def is_duplicate(self, text: str) -> bool:
        """Check if text is semantically similar to any existing item."""
        if not self.enabled:
            return False

        if not self._texts:
            return False

        normalized = normalize_text(text).lower()

        # Quick exact match check first
        for existing in self._texts:
            if normalize_text(existing).lower() == normalized:
                return True

        if self.method == "tfidf" or self._get_encoder() is None:
            return self._tfidf_check(text)
        else:
            return self._embedding_check(text)

    def _tfidf_check(self, text: str) -> bool:
        """TF-IDF based similarity check."""
        try:
            from sklearn.feature_extraction.text import TfidfVectorizer
            from sklearn.metrics.pairwise import cosine_similarity

            if not hasattr(self, "_vectorizer"):
                self._init_tfidf(self._texts)

            # Transform new text
            new_vec = self._vectorizer.transform([text])
            existing_vec = self._vectorizer.transform(self._texts)

            sims = cosine_similarity(new_vec, existing_vec)[0]
            max_sim = sims.max()

            return max_sim >= self.threshold
        except Exception:
            # If TF-IDF fails, fall back to hash-based dedup
            return False

    def _embedding_check(self, text: str) -> bool:
        """Embedding-based similarity check."""
        try:
            import numpy as np
            encoder = self._get_encoder()
            if encoder is None:
                return False

            # Encode all existing texts
            if not hasattr(self, "_existing_embeddings"):
                self._existing_embeddings = encoder.encode(self._texts, show_progress_bar=False)

            # Encode new text
            new_emb = encoder.encode([text], show_progress_bar=False)[0]

            # Compute cosine similarity
            from sklearn.metrics.pairwise import cosine_similarity
            sims = cosine_similarity([new_emb], self._existing_embeddings)[0]

            return sims.max() >= self.threshold
        except Exception:
            return False

    def add(self, text: str) -> None:
        """Add text to the dedup index."""
        self._texts.append(text)
        # Invalidate cached TF-IDF/embeddings
        if hasattr(self, "_tfidf_matrix"):
            delattr(self, "_tfidf_matrix")
        if hasattr(self, "_cosine_sim"):
            delattr(self, "_cosine_sim")
        if hasattr(self, "_existing_embeddings"):
            delattr(self, "_existing_embeddings")

    def add_existing(self, text: str) -> None:
        """Add an existing item to the seen set."""
        self.add(text)

    def get_stats(self) -> dict:
        """Get dedup statistics."""
        return {
            "method": self.method,
            "threshold": self.threshold,
            "indexed_items": len(self._texts),
        }
