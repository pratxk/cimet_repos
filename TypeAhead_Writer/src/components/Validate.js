


export const validateUPIid = (input, domain) => {

    // Check for all small letters and @
    const regex = /^[a-z@]+$/;
    if (!regex.test(input)) {
        return "Invalid characters: Only lowercase letters and '@' are allowed.";
    }

    // Check that it does not start with @
    if (input.startsWith('@')) {
        return "UPI ID cannot start with '@'.";
    }

    // Check for a single @
    const atCount = (input.match(/@/g) || []).length;
    if (atCount !== 1) {
        return "There must be exactly one '@' in the UPI ID.";
    }

    // Split the input to validate @ position and domain
    const [prefix, suffix] = input.split('@');

    // Check that @ is placed only after at least 8 characters
    if (prefix.length < 8) {
        return "The part before '@' must contain at least 8 characters.";
    }

    // Check that the suffix matches one of the domains
    if (!domain.includes(suffix)) {
        return `The domain '${suffix}' is not valid. Valid domains are: ${domain.join(', ')}.`;
    }

    return "UPI ID is valid."; // All checks passed
};


