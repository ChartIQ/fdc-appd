/**
 * A shortcut to String.toLowerCase()
 * @param {string} text The string to call .toLowerCase() on
 */
const lc = (text = '') => {
    return text.toString().toLowerCase().trim();
}

module.exports = (req, res) => {
    const params = req.body;
    let applications = require(__basedir + '/data.json')
    // Lets keep it readable
    // filter for text first
    if (params.text) {
        const text = lc(params.text)
        applications = applications.filter((app) => {
            return app.name && lc(app.name).indexOf(text) > -1 ||
                app.title && lc(app.title).indexOf(text) > -1 ||
                app.description && lc(app.description).indexOf(text) > -1
        })
    }
    // filter for tags and make sure tags property is there and its an array, and that it's not empty
    if (params.tags && params.tags.pop && params.tags.length !== 0) {
        applications = applications.filter((app) => {
            return app.tags.filter(tag => params.tags.includes(tag)).length
        })
    }
    
    res.status(200).json({
        applications,
        message: 'successful'
    })
}