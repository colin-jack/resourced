var Link = function(rel, url) {
    if (!rel || !url) {
        throw new Error("Please provide both the URL and rel when creating link.");
    }

    this.rel = rel;
    this.url = url;
}

module.exports = Link;