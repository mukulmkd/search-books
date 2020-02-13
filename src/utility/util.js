export default class utility {
    constructor(keywords, noOfResults, data) {
        this.keywords = keywords;
        this.noOfResults = noOfResults;
        this.data = data;
    }
    searchSummary = async () => {
        let brokenKeywords = this.removeStopWords(this.keywords.trim()).split(" ");
        let filteredSummaries = await this.data.summaries.filter((item) => {
            let filtered = [];
            for (let index = 0; index < brokenKeywords.length; index++) {
                filtered = item.summary.replace("The Book in Three Sentences:", "").toLowerCase().includes(brokenKeywords[index]);
            }
            return filtered;
        });
        return filteredSummaries.slice(0, this.noOfResults);
    }
    getAutoSuggestion = async () => {
        let autoSuggest = await this.data.queries.filter((item) => {
            return item.toLowerCase().includes(this.keywords.toLowerCase());
        });
        return autoSuggest;
    }
    removeStopWords = (query) => {
        // Taken from internet to make Search more relevant
        // Can of course be some API or be achieved through some packages
        const stopwords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 'u', 'v', 'w', 'x', 'y', 'z', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'];
        let res = [];
        let words = query.split(" ");
        for (let i = 0; i < words.length; i++) {
            if (!stopwords.includes(words[i])) {
                res.push(words[i]);
            }
        }
        return (res.join(" "));
    }
}