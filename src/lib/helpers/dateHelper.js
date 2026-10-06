const toInput = (s) => {
    const d = new Date(s)
    return new Date(d - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

export {toInput}