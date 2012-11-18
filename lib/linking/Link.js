var Link = function(rel, href) {
    if (!rel || !href) {
        throw new Error("Please provide both the URL and rel when creating link.");
    }

    this.rel = rel;
    this.href = href;
}

module.exports = Link;