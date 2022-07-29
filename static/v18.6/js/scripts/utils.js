util = {
    LoadCss: function(href) {
        var style = document.createElement("link");
        style.rel = "stylesheet";
        style.type = "text/css";
        style.href = href;
        document.head.appendChild(style);
    },

    AddReFerence: function(url, type, body) {
        body = body === undefined ? 'body' : body;
        var fileref = "";
        if (type === "js") {
            fileref = document.createElement("script");
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("async", true);
            fileref.setAttribute("src", url);
            body = 'body';

        } else if (type === "css") {
            fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", url);
            body = 'head';
        }
        if (typeof fileref !== "undefined") document.getElementsByTagName(body)[0].appendChild(fileref);



    },
    IsNumberKey(evt, obj) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (charCode === 59 || charCode === 46) {
            Cb.util.FormatMoney(obj);
            return true;
        }
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    },
    UnloadCSS: function(href) {
        var docHead = document.head;
        if (docHead) {
            var targetCss = docHead.querySelector('[href="' + href + '"]');
            if (targetCss) {
                targetCss.remove();
            }
        }
    },
    CountUp: function(target, isCanvas, isImages, startVal, endVal, decimals, duration, options) {
        var lastTime = 0;
        var vendors = ["webkit", "moz", "ms", "o"];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
            window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] ||
                window[vendors[x] + "CancelRequestAnimationFrame"];
        }
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
        var self = this;
        self.options = {
            useEasing: true,
            useGrouping: true,
            separator: ",",
            decimal: ".",
            easingFn: null,
            formattingFn: util.ParseMoney
        };
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                self.options[key] = options[key];
            }
        }
        if (self.options.separator === "") {
            self.options.useGrouping = false;
        }
        if (!self.options.prefix) self.options.prefix = "";
        if (!self.options.suffix) self.options.suffix = "";
        if (isCanvas) {
            self.d = target;
        } else
            self.d = (typeof target === "string") ? document.getElementById(target) : target;
        self.startVal = Number(startVal);
        self.endVal = Number(endVal);
        self.countDown = (self.startVal > self.endVal);
        self.frameVal = self.startVal;
        self.decimals = Math.max(0, decimals || 0);
        self.dec = Math.pow(10, self.decimals);
        self.duration = Number(duration) * 1000 || 2000;
        self.formatNumber = function(nStr) {
            nStr = nStr.toFixed(self.decimals);
            nStr += "";
            var x1;
            var x = nStr.split(".");
            x1 = x[0];
            var x2 = x.length > 1 ? self.options.decimal + x[1] : "";
            var rgx = /(\d+)(\d{3})/;
            if (self.options.useGrouping) {
                while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, "$1" + self.options.separator + "$2");
                }
            }
            return self.options.prefix + x1 + x2 + self.options.suffix;
        };
        self.easeOutExpo = function(t, b, c, d) {
            return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
        };
        self.easingFn = self.options.easingFn ? self.options.easingFn : self.easeOutExpo;
        self.formattingFn = self.options.formattingFn ? self.options.formattingFn : self.formatNumber;
        self.version = function() {
            return "1.8.1";
        };
        self.printValue = function(value) {
            var result = self.formattingFn(value);
            if (isCanvas)
                self.d.setText(result);
            else {
                try {
                    if (self.d.tagName === "INPUT") {
                        self.d.value = result;
                    } else if (self.d.tagName === "text" || self.d.tagName === "tspan") {
                        self.d.textContent = result;
                    } else {
                        if (isImages)
                            self.d.innerHTML = util.NumberToImage(result);
                        else
                            self.d.innerHTML = result;
                    }
                } catch (e) {};
            }
        };
        self.count = function(timestamp) {
            if (!self.startTime) {
                self.startTime = timestamp;
            }
            self.timestamp = timestamp;
            var progress = timestamp - self.startTime;
            self.remaining = self.duration - progress;
            if (self.options.useEasing) {
                if (self.countDown) {
                    self.frameVal =
                        self.startVal - self.easingFn(progress, 0, self.startVal - self.endVal, self.duration);
                } else {
                    self.frameVal = self.easingFn(progress, self.startVal, self.endVal - self.startVal, self.duration);
                }
            } else {
                if (self.countDown) {
                    self.frameVal = self.startVal - ((self.startVal - self.endVal) * (progress / self.duration));
                } else {
                    self.frameVal = self.startVal + (self.endVal - self.startVal) * (progress / self.duration);
                }
            }
            if (self.countDown) {
                self.frameVal = (self.frameVal < self.endVal) ? self.endVal : self.frameVal;
            } else {
                self.frameVal = (self.frameVal > self.endVal) ? self.endVal : self.frameVal;
            }
            self.frameVal = Math.round(self.frameVal * self.dec) / self.dec;
            self.printValue(self.frameVal);
            if (progress < self.duration) {
                self.rAF = requestAnimationFrame(self.count);
            } else {
                if (self.callback) {
                    self.callback();
                }
            }
        };
        self.start = function(callback) {
            self.callback = callback;
            self.rAF = requestAnimationFrame(self.count);
            return false;
        };
        self.pauseResume = function() {
            if (!self.paused) {
                self.paused = true;
                cancelAnimationFrame(self.rAF);
            } else {
                self.paused = false;
                delete self.startTime;
                self.duration = self.remaining;
                self.startVal = self.frameVal;
                requestAnimationFrame(self.count);
            }
        };
        self.reset = function() {
            self.paused = false;
            delete self.startTime;
            self.startVal = startVal;
            cancelAnimationFrame(self.rAF);
            self.printValue(self.startVal);
        };
        self.max = function() {
            self.paused = false;
            delete self.startTime;
            cancelAnimationFrame(self.rAF);
            self.printValue(self.endVal);
        };
        self.update = function(newEndVal, callback) {
            cancelAnimationFrame(self.rAF);
            self.paused = false;
            delete self.startTime;
            self.startVal = self.frameVal;
            delete self.callback;
            self.callback = callback;
            self.endVal = Number(newEndVal);
            self.countDown = (self.startVal > self.endVal);
            self.rAF = requestAnimationFrame(self.count);
        };
        self.printValue(self.startVal);
    },
    GetData: function(url, param, callBack, failCallback) {
        try {
            $.ajax({
                type: "GET",
                url: url,
                processData: true,
                data: param,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                cache: false,
                success: function(data) {
                    if (typeof callBack == "function")
                        callBack(data);
                },
                error: function(xhr) {
                    if (xhr.status === 200) {
                        if (typeof callBack == "function")
                            callBack(xhr.responseText);
                    } else {
                        if (typeof failCallback == "function")
                            failCallback(xhr);
                    }
                }
            });
        } catch (err) {
            alert(err);
        }
    },
    PostData: function(url, param, callBack, failCallback) {
        try {
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    if (typeof callBack == 'function')
                        callBack(data);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    if (xhr.status === 200) {
                        if (typeof callBack == 'function')
                            callBack(xhr.responseText);
                    } else {
                        console.log("Error:", xhr.responseText);
                        if (typeof failCallback == 'function')
                            failCallback(xhr);
                    }
                }
            });
        } catch (err) {
            alert(err);
        }
    },
    FormatDatetime: function(date) {
        date = date.replace(/\-/g, "\/").replace(/[T|Z]/g, " ");
        if (date.indexOf(".") > 0)
            date = date.substring(0, date.indexOf("."));
        var d = new Date(date);
        var currDate = d.getDate();
        var currMonth = d.getMonth();
        var currYear = d.getFullYear();
        var hour = d.getHours();
        var minute = d.getMinutes();
        var second = d.getSeconds();
        if (currDate < 10) currDate = "0" + currDate;
        if ((currMonth + 1) < 10) currMonth = "0" + (currMonth + 1);
        else currMonth = currMonth + 1;
        if (hour < 10) hour = "0" + hour;
        if (minute < 10) minute = "0" + minute;
        if (second < 10) second = "0" + second;
        return currDate + "/" + currMonth + " " + hour + ":" + minute + ":" + second;
    },
    FormatMonthDay: function(date) {
        date = date.replace(/\-/g, "\/").replace(/[T|Z]/g, " ");
        if (date.indexOf(".") > 0)
            date = date.substring(0, date.indexOf("."));
        var d = new Date(date);
        var currDate = d.getDate();
        var currMonth = d.getMonth();
        var currYear = d.getFullYear();
        var hour = d.getHours();
        var minute = d.getMinutes();
        var second = d.getSeconds();
        if (currDate < 10) currDate = "0" + currDate;
        if ((currMonth + 1) < 10) currMonth = "0" + (currMonth + 1);
        else currMonth = currMonth + 1;
        if (hour < 10) hour = "0" + hour;
        if (minute < 10) minute = "0" + minute;
        if (second < 10) second = "0" + second;
        return currDate + "/" + currMonth;
    },
    ParseMoney: function(money, pre) {
        var p = ".";
        if (pre) p = pre;
        if (money == undefined) return "";
        var strMoney = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, p);
        return strMoney;
    },
    ClearTimeOut: function(timer) {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    },
    ClearTimeInterval: function(timer) {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    },
    NumberToImage: function(number) {
        var html = "";
        $.each(number.split(""),
            function(key, value) {
                html += (value === "." ? '<i class="dot"></i> ' : '<i class="n' + value + '"></i> ');
            });
        return html;
    },
    JsonGroup: function(data, groupBy) {
        var categories = {};
        for (var i = 0; i < data.length; i++) {
            if (!categories[data[i][groupBy]])
                categories[data[i][groupBy]] = [];
            categories[data[i][groupBy]].push(data[i]);
        };
        return categories;
    },
    getObjects: function(obj, key, val) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(getObjects(obj[i], key, val));
            } else if (i == key && obj[key] == val) {
                objects.push(obj);
            }
        }
        return objects;
    }
};