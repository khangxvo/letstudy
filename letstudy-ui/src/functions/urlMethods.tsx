import React from 'react'
import { Request, Response } from 'express'

/**
 * Fetches data from the specified URL using a GET request.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<any>} The data fetched from the URL.
 */
const getURL = async (url: string) => {
    const res = await fetch(url)
    return res
}

/**
 * Sends data to the specified URL using a POST request.
 * @param {string} url - The URL to send data to.
 * @param {string} body - The data to send in the request body.
 * @param {string} auth_token - The authentication token (optional).
 * @returns {Promise<any>} The response data from the server.
 */
const postURL = async (url: string, body: string, auth_token: string = '') => {

    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': auth_token
        },
        body: body
    })

    return res
}

export { getURL, postURL }