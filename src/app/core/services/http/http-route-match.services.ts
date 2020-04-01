// import { URLSearchParams } from '@angular/common/http';

/*
based on https://github.com/cowboy/javascript-route-matcher
*/
/*
// Use routeMatcher to create a reusable route matching function.
var search = routeMatcher("search/:query/p:page");
search.parse("search/gonna-fail") // null (no match)
search.parse("search/cowboy/p5")  // {query: "cowboy", page: "5"}
search.parse("search/gnarf/p10")  // {query: "gnarf", page: "10"}

// But wait, it goes both ways!
search.stringify({query: "bonus", page: "6"}) // "search/bonus/p6"

// You can also pass in a map of per-param validators after the route, each can
// be a RegExp to test against, function that accepts a value (and returns true
// or false) or value to match against.
var user = routeMatcher("user/:id/:other", {
  id: /^\d+$/,
  other: function(value) { return value === "" || value === "foo"; }
});
user.parse("user/123/abc")  // null (no match)
user.parse("user/foo/")     // null (no match)
user.parse("user/123/")     // {id: "123", other: ""}
user.parse("user/123/foo")  // {id: "123", other: "foo"}
*/

export class RouteMatcher {
    // Characters to be escaped with \. RegExp borrowed from the Backbone router
    // but escaped (note: unnecessarily) to keep JSHint from complaining.
    private reEscape = /[\-\[\]{}()+?.,\\\^$|#\s]/g;
    // Match named :param or *splat placeholders.
    private reParam = /([:*])(\w+)/g;
    // The resulting reg exp
    private routeRegExp: RegExp;
    private routeParamNames = [];

    constructor(
        private route: string,
        private rules: any) {

        let re: string;
        // Escape special chars.
        re = this.route.replace(this.reEscape, '\\$&');
        // Replace any :param or *splat with the appropriate capture group.
        re = re.replace(this.reParam, (_, mode, name) => {
            this.routeParamNames.push(name);
            // :param should capture until the next / or EOL, while *splat should
            // capture until the next :param, *splat, or EOL.
            return mode === ':' ? '([^/]*)' : '(.*)';
        });
        // Add ^/$ anchors and create the actual RegExp.
        this.routeRegExp = new RegExp('^' + re + '$');
    }

    matches(url: string): boolean {
        return this.parse(url) !== null;
    }

    getUrlParams(search) {
        const hashes = search.slice(search.indexOf('?') + 1).split('&');
        const params = {};
        hashes.map(hash => {
            const [key, val] = hash.split('=');
            params[key] = decodeURIComponent(val);
        });
        return params;
    }

    // Match the passed url against the route, returning an object of params
    // and values.
    parse(url: string): any {

        let queryParams: any = null;

        if (url.indexOf('?') > -1) {
            const q = url.substring(url.indexOf('?'));
            // to remove URLSearchParams ->  https://github.com/angular/angular/issues/18403
            const u = new URLSearchParams(q.substr(1));
            const uParams = this.getUrlParams(url); // getUrlParams(window.location.search)
            const uParamsMap = new Map<string, string[]>();

            Object.keys(uParams).forEach(key => {
                uParamsMap.set(key, u.getAll(key));
            });

            queryParams = this.mapToObject(uParamsMap);
            url = url.replace(q, '');
        }

        let i = 0;
        let param;
        let value;
        let params = {};
        const matches = url.match(this.routeRegExp);
        // If no matches, return null.
        if (!matches) { return null; }
        // Add all matched :param / *splat values into the params object.
        while (i < this.routeParamNames.length) {
            param = this.routeParamNames[i++];
            value = matches[i];
            // If a rule exists for thie param and it doesn't validate, return null.
            if (this.rules && param in this.rules && !this.validateRule(this.rules[param], value)) {
                return null;
            }
            params[param] = value;
        }

        if (queryParams) {
            params = Object.assign({}, params, queryParams);
        }

        return params;
    }

    private mapToObject(map: Map<string, string[]>): any {
        let result = {};

        map.forEach((value: string[], key: string) => {
            const o = {};
            o[key] = value.length > 1 ? value : value[0];
            result = Object.assign(result, o);
        });

        return result;
    }

    // Test to see if a value matches the corresponding rule.
    private validateRule(rule, value) {
        // For a given rule, get the first letter of the string name of its
        // constructor function. 'R' -> RegExp, 'F' -> Function (these shouldn't
        // conflict with any other types one might specify). Note: instead of
        // getting .toString from a new object {} or Object.prototype, I'm assuming
        // that exports will always be an object, and using its .toString method.
        // Bad idea? Let me know by filing an issue
        const type = {}.toString.call(rule).charAt(8);
        // If regexp, match. If function, invoke. Otherwise, compare. Note that ==
        // is used because type coercion is needed, as `value` will always be a
        // string, but `rule` might not.
        return type === 'R' ? rule.test(value) : type === 'F' ? rule(value) : rule === value;
    }
}
