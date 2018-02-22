"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            template: "\n    <ActionBar title=\"My Apple\" class=\"action-bar\"></ActionBar>\n    <Image src=\"~/images/apple.jpg\"></Image>\n  ",
            styles: ["\n    @keyframes spin {\n      from { transform: rotate(0); } to { transform: rotate(360); }\n    }\n    Image {\n      animation-name: spin; animation-duration: 3s;\n      animation-iteration-count: infinite;\n      animation-timing-function: linear;\n    }\n  "]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFtQjFDO0lBQUE7SUFBMkIsQ0FBQztJQUFmLFlBQVk7UUFqQnhCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsUUFBUTtZQUNsQixRQUFRLEVBQUUsMkhBR1Q7WUFDRCxNQUFNLEVBQUUsQ0FBQyx3UUFTUixDQUFDO1NBQ0gsQ0FBQztPQUNXLFlBQVksQ0FBRztJQUFELG1CQUFDO0NBQUEsQUFBNUIsSUFBNEI7QUFBZixvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgdGVtcGxhdGU6IGBcbiAgICA8QWN0aW9uQmFyIHRpdGxlPVwiTXkgQXBwbGVcIiBjbGFzcz1cImFjdGlvbi1iYXJcIj48L0FjdGlvbkJhcj5cbiAgICA8SW1hZ2Ugc3JjPVwifi9pbWFnZXMvYXBwbGUuanBnXCI+PC9JbWFnZT5cbiAgYCxcbiAgc3R5bGVzOiBbYFxuICAgIEBrZXlmcmFtZXMgc3BpbiB7XG4gICAgICBmcm9tIHsgdHJhbnNmb3JtOiByb3RhdGUoMCk7IH0gdG8geyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjApOyB9XG4gICAgfVxuICAgIEltYWdlIHtcbiAgICAgIGFuaW1hdGlvbi1uYW1lOiBzcGluOyBhbmltYXRpb24tZHVyYXRpb246IDNzO1xuICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XG4gICAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXI7XG4gICAgfVxuICBgXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge31cbiJdfQ==