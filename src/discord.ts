import axios from 'axios';

// LOGIN SECTION

// typing for localstorage mapping
type LocalStorageKeyMap = {
    [key: string]: string,
}

/**
 * Keys corresponding to values that should be tokens (if logged in)
 * keys will be stored in localstorage
 */
const LOCALSTORAGE_KEYS: LocalStorageKeyMap = {
    accessToken: 'discord_access_token', // access token for discord
    refreshToken: 'discord_refresh_token', // refresh token for discord
    expireTime: 'discord_token_expire_time', // amount of time it takes for the token to expire
    timestamp: 'discord_token_timestamp', // timestamp when we get the access token to check for expiry
}

/**
 * values for token data stored in localstorage
 */
const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
}

/**
 * checks whether the token has expired or not based on the initial timestamp and expire time.
 * @returns {boolean}
 */
const hasTokenExpired = ():boolean => {
    const accessToken = LOCALSTORAGE_VALUES.accessToken || null;
    const expireTime = LOCALSTORAGE_VALUES.expireTime || null;
    const timestamp = LOCALSTORAGE_VALUES.timestamp || null;

    // if we don't have an access token or a timestamp, we can't check expire time
    if (!accessToken || !timestamp) {
        return false;
    }

    const millisecondsElapsed = Date.now() - Number(timestamp);
    return (millisecondsElapsed/1000) > Number(expireTime);
}

/**
 * if the token has expired but we have a refresh token, refresh it
 * doesn't return anything
 */
const refreshToken = async () => {
    // try and get the access token from our given refresh token
    try {
        // check for nonexistence/rapid refresh
        if (!LOCALSTORAGE_VALUES.refreshToken || // refresh token is null
            LOCALSTORAGE_VALUES.refreshToken === 'undefined' || // refresh token is undefined
            (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000) < 10 // less than 10 seconds have passed since last timestamp 
        ) { 
            console.log('No refresh token available');
            logout();    
        }

        // get the data from refresh token endpoint in our express app
        const response = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);
        
        if (response.data && response.data.access_token) {
            window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, response.data.access_token);
            window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now().toString());
        } else {
            throw new Error('Failed to get the refresh token from the server.');
        }
    }
    catch (e) {
        console.error(e);
    }
}

/**
 * Actual logic for getting access token
 * TODO: need to finish the function - check whether token is valid/unexpired, pass token
 */
const getAccessToken = ():void => {
    const queryString = window.location.search; // gets the queries from the url, which is sent from express
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expire_time'),
    }
}

// LOGOUT SECTION
export const logout = (): void => {
    // clear all values from localStorage
    for (const property in LOCALSTORAGE_KEYS) {
        window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
    }

    window.location.href = window.location.origin;
}