import re


def analyze_name(name: str) -> bool:
    """
    Analyze the given name using simple NLP rules.

    Returns True if the name is valid:
    - Not empty
    - Only contains alphabetic characters and optional spaces
    - At least 2 characters long
    """
    name = name.strip()

    if not name or len(name) < 2:
        return False

    # Allow letters and spaces only
    return bool(re.fullmatch(r"[A-Za-z\s]+", name))
