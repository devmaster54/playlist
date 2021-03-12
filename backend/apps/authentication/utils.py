from rest_framework.exceptions import ValidationError
import random
import string


def validate_password_strength(password):
    min_length = 12
    errors = []
    flag = False

    if len(password) < min_length:
        errors.append(f"Password must be at least {min_length} characters " "long.")
        flag = True

    # check for 1 digits
    if not any(c.isdigit() for c in password):
        errors.append("Password must contain at least 1 digit.")
        flag = True

    # check for uppercase letter
    if not any(c.isupper() for c in password):
        errors.append("Password must contain at least 1 uppercase letter.")
        flag = True

    # check for uppercase letter
    if not any(c.islower() for c in password):
        errors.append("Password must contain at least 1 lowecase letter.")
        flag = True

    # check for special letter
    special_characters = string.punctuation
    special_bools = list(map(lambda char: char in special_characters, password))
    if not any(special_bools):
        errors.append("Password must contain at least 1 special letter.")
        flag = True
    if flag:
        raise ValidationError(errors)
    return password
