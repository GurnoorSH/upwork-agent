"""Tests for JSON extraction parser."""

from aigen.parsers.json_extract import extract_json_array, extract_json_object


def test_simple_array():
    text = '[{"a": 1}, {"b": 2}]'
    result = extract_json_array(text)
    assert len(result) == 2
    assert result[0]["a"] == 1


def test_fenced_json():
    text = """Here is the data:
```json
[{"name": "test"}]
```
Hope this helps!"""
    result = extract_json_array(text)
    assert len(result) == 1
    assert result[0]["name"] == "test"


def test_empty_input():
    assert extract_json_array("") == []
    assert extract_json_array(None) == []


def test_no_json():
    assert extract_json_array("just some text") == []


def test_malicious_wrapping():
    """Should find the array even in noisy text."""
    text = """Sure! Here's your data:

Some explanation...
[{"id": 1, "value": "hello"}]
And more text after."""
    result = extract_json_array(text)
    assert len(result) == 1
    assert result[0]["id"] == 1


def test_multiple_arrays_picks_largest():
    text = '[{"a":1}] and [{"b":2},{"c":3},{"d":4}]'
    result = extract_json_array(text)
    assert len(result) == 3


def test_simple_object():
    text = '{"results": [{"jobId": "1"}]}'
    result = extract_json_object(text)
    assert result["results"][0]["jobId"] == "1"


def test_fenced_object():
    text = """Here is the ranking:
```json
{"results": [{"jobId": "abc", "selected": true}]}
```
Done."""
    result = extract_json_object(text)
    assert result["results"][0]["selected"] is True


def test_noisy_wrapped_object():
    text = """Sure, here is the JSON object:

{"results": [{"jobId": "abc", "score": 8}], "meta": {"platform": "gemini"}}

Use it as-is."""
    result = extract_json_object(text)
    assert result["meta"]["platform"] == "gemini"
    assert result["results"][0]["score"] == 8


def test_empty_object_input():
    assert extract_json_object("") == {}
    assert extract_json_object(None) == {}


def test_no_object_json():
    assert extract_json_object("just some text") == {}
    assert extract_json_object('[{"a": 1}]') == {}


def test_multiple_objects_picks_largest():
    text = '{"a":1} and {"results":[{"jobId":"1"},{"jobId":"2"}]}'
    result = extract_json_object(text)
    assert len(result["results"]) == 2


def test_object_scanner_ignores_braces_inside_strings():
    text = 'prefix {"message": "literal braces { like this }", "results": []} suffix'
    result = extract_json_object(text)
    assert result["message"] == "literal braces { like this }"


def test_malformed_object_returns_empty_dict():
    assert extract_json_object('{"results": [}') == {}
