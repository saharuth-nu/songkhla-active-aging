import { customAlphabet } from "nanoid"

// 8-char uppercase alphanumeric ID for readable primary keys
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
export const nanoid = customAlphabet(alphabet, 8)
