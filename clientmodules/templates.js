(function () {
var root = this, exports = {};

// The jade runtime:
var jade=function(exports){Array.isArray||(Array.isArray=function(arr){return"[object Array]"==Object.prototype.toString.call(arr)}),Object.keys||(Object.keys=function(obj){var arr=[];for(var key in obj)obj.hasOwnProperty(key)&&arr.push(key);return arr}),exports.merge=function merge(a,b){var ac=a["class"],bc=b["class"];if(ac||bc)ac=ac||[],bc=bc||[],Array.isArray(ac)||(ac=[ac]),Array.isArray(bc)||(bc=[bc]),ac=ac.filter(nulls),bc=bc.filter(nulls),a["class"]=ac.concat(bc).join(" ");for(var key in b)key!="class"&&(a[key]=b[key]);return a};function nulls(val){return val!=null}return exports.attrs=function attrs(obj,escaped){var buf=[],terse=obj.terse;delete obj.terse;var keys=Object.keys(obj),len=keys.length;if(len){buf.push("");for(var i=0;i<len;++i){var key=keys[i],val=obj[key];"boolean"==typeof val||null==val?val&&(terse?buf.push(key):buf.push(key+'="'+key+'"')):0==key.indexOf("data")&&"string"!=typeof val?buf.push(key+"='"+JSON.stringify(val)+"'"):"class"==key&&Array.isArray(val)?buf.push(key+'="'+exports.escape(val.join(" "))+'"'):escaped&&escaped[key]?buf.push(key+'="'+exports.escape(val)+'"'):buf.push(key+'="'+val+'"')}}return buf.join(" ")},exports.escape=function escape(html){return String(html).replace(/&(?!(\w+|\#\d+);)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},exports.rethrow=function rethrow(err,filename,lineno){if(!filename)throw err;var context=3,str=require("fs").readFileSync(filename,"utf8"),lines=str.split("\n"),start=Math.max(lineno-context,0),end=Math.min(lines.length,lineno+context),context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;return(curr==lineno?"  > ":"    ")+curr+"| "+line}).join("\n");throw err.path=filename,err.message=(filename||"Jade")+":"+lineno+"\n"+context+"\n\n"+err.message,err},exports}({});

// create our folder objects

// app.jade compiled template
exports.app = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        var __indent = [];
        buf.push('\n<aside>\n  <div class="shippedContainer"></div>\n</aside>\n<section id="people">\n  <div class="people"></div>\n</section>');
    }
    return buf.join("");
};

// member.jade compiled template
exports.member = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        var __indent = [];
        buf.push('\n<div class="well member">\n  <div class="userImage"><img');
        buf.push(attrs({
            src: locals.member.picUrl() + "?s=50"
        }, {
            src: true
        }));
        buf.push("/></div>\n  <h4>");
        var __val__ = locals.member.fullName();
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push('</h4>\n  <p class="activeTask">');
        var __val__ = locals.activeTaskTitle || "";
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push('</p>\n  <div class="shippedCount"></div>\n</div>');
    }
    return buf.join("");
};

// rocket.jade compiled template
exports.rocket = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        var __indent = [];
        buf.push('\n<div class="icon">\n  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50">\n    <g>\n      <path d="M38.375,6.086c-0.009-0.235-0.186-0.412-0.422-0.422c-4.341-0.156-8.674,0.534-12.557,2.546 c-2.91,1.507-5.355,3.771-7.278,6.406c-1.979,0.109-3.843,0.797-5.611,1.659c-1.105,0.539-2.06,0.997-2.739,2.031 c-1.496,2.28-2.063,5.354-2.357,8.027c-0.025,0.223,0.254,0.336,0.423,0.242c1.69-0.919,3.746-1.252,5.67-1.333 c-0.085,0.44-0.163,0.879-0.224,1.318c-0.008,0.057-0.015,0.112-0.022,0.167c-0.037,0.085-0.044,0.178-0.007,0.268 c0.026,0.113,0.103,0.189,0.199,0.228c0.049,0.042,0.097,0.083,0.146,0.124c-0.146,0.417-0.29,0.834-0.436,1.251 c-0.029,0.085,0,0.217,0.072,0.273c1.249,0.984,2.498,1.968,3.748,2.952c0.1,0.079,0.222,0.114,0.34,0.044 c0.299-0.177,0.597-0.353,0.895-0.53c0.328,0.183,0.66,0.27,0.98,0.173c0.288-0.087,0.573-0.179,0.858-0.273 c0.139,1.82,0.048,3.744-0.589,5.437c-0.078,0.21,0.154,0.395,0.347,0.347c2.544-0.644,5.368-1.618,7.42-3.294 c0.949-0.775,1.23-1.525,1.646-2.659c0.642-1.754,1.1-3.637,1.071-5.515c0.342-0.309,0.676-0.622,1.002-0.949 c4.289-4.322,6.735-10.249,7.324-16.262C38.352,7.543,38.404,6.877,38.375,6.086z M28.694,17.666c-1.802,0-3.261-1.46-3.261-3.261 c0-1.802,1.459-3.262,3.261-3.262s3.261,1.46,3.261,3.262C31.955,16.206,30.496,17.666,28.694,17.666z"></path>\n      <path d="M14.889,32.455c-0.024-0.036-0.051-0.062-0.08-0.085c-1.373-1.53-3.604-1.883-5.261-0.554 c-0.028,0.011-0.055,0.025-0.08,0.046c-1.697,1.344,0.107,4.308-2.274,4.92c-0.175,0.046-0.227,0.363-0.072,0.521 c1.195,1.216,2.942,1.784,4.619,1.517c3.023-0.483,4.901-3.606,3.205-6.274C14.932,32.517,14.915,32.484,14.889,32.455z"> </path>\n    </g>\n  </svg>\n</div>');
    }
    return buf.join("");
};

// shipped.jade compiled template
exports.shipped = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        var __indent = [];
        buf.push('\n<div class="alert alert-info shipped">\n  <div class="userImage"><img');
        buf.push(attrs({
            src: locals.task.member().picUrl() + "?s=26"
        }, {
            src: true
        }));
        buf.push('/></div>\n  <div class="title">');
        var __val__ = locals.task.get("title");
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push('</div>\n  <div class="icon">\n    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50">\n      <g>\n        <path d="M38.375,6.086c-0.009-0.235-0.186-0.412-0.422-0.422c-4.341-0.156-8.674,0.534-12.557,2.546 c-2.91,1.507-5.355,3.771-7.278,6.406c-1.979,0.109-3.843,0.797-5.611,1.659c-1.105,0.539-2.06,0.997-2.739,2.031 c-1.496,2.28-2.063,5.354-2.357,8.027c-0.025,0.223,0.254,0.336,0.423,0.242c1.69-0.919,3.746-1.252,5.67-1.333 c-0.085,0.44-0.163,0.879-0.224,1.318c-0.008,0.057-0.015,0.112-0.022,0.167c-0.037,0.085-0.044,0.178-0.007,0.268 c0.026,0.113,0.103,0.189,0.199,0.228c0.049,0.042,0.097,0.083,0.146,0.124c-0.146,0.417-0.29,0.834-0.436,1.251 c-0.029,0.085,0,0.217,0.072,0.273c1.249,0.984,2.498,1.968,3.748,2.952c0.1,0.079,0.222,0.114,0.34,0.044 c0.299-0.177,0.597-0.353,0.895-0.53c0.328,0.183,0.66,0.27,0.98,0.173c0.288-0.087,0.573-0.179,0.858-0.273 c0.139,1.82,0.048,3.744-0.589,5.437c-0.078,0.21,0.154,0.395,0.347,0.347c2.544-0.644,5.368-1.618,7.42-3.294 c0.949-0.775,1.23-1.525,1.646-2.659c0.642-1.754,1.1-3.637,1.071-5.515c0.342-0.309,0.676-0.622,1.002-0.949 c4.289-4.322,6.735-10.249,7.324-16.262C38.352,7.543,38.404,6.877,38.375,6.086z M28.694,17.666c-1.802,0-3.261-1.46-3.261-3.261 c0-1.802,1.459-3.262,3.261-3.262s3.261,1.46,3.261,3.262C31.955,16.206,30.496,17.666,28.694,17.666z"></path>\n        <path d="M14.889,32.455c-0.024-0.036-0.051-0.062-0.08-0.085c-1.373-1.53-3.604-1.883-5.261-0.554 c-0.028,0.011-0.055,0.025-0.08,0.046c-1.697,1.344,0.107,4.308-2.274,4.92c-0.175,0.046-0.227,0.363-0.072,0.521 c1.195,1.216,2.942,1.784,4.619,1.517c3.023-0.483,4.901-3.606,3.205-6.274C14.932,32.517,14.915,32.484,14.889,32.455z"> </path>\n      </g>\n    </svg>\n  </div>\n</div>');
    }
    return buf.join("");
};


// attach to window or export with commonJS
if (typeof module !== "undefined") {
    module.exports = exports;
} else if (typeof define === "function" && define.amd) {
    define(exports);
} else {
    root.templatizer = exports;
}

})();