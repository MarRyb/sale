(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{jaXT:function(t,n,o){"use strict";o.d(n,"a",function(){return e});var p=o("qc5V"),i=o("CcnG"),e=function(){function t(t){this.api=t}return t.prototype.getList=function(t){return this.api.get("open_api/v1/posts/",t)},t.prototype.get=function(t){return this.api.get("open_api/v1/posts/"+t)},t.prototype.new=function(t){return this.api.post("api/v1/posts/new",t)},t.prototype.postFiles=function(t){return this.api.post("api/v1/posts/files",t)},t.prototype.attachPostFile=function(t,n){return this.api.post("api/v1/posts/"+t+"/files/"+n)},t.ngInjectableDef=i.Sb({factory:function(){return new t(i.Tb(p.a))},token:t,providedIn:"root"}),t}()}}]);