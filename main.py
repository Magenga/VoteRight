from flask import Flask,render_template,render_template_string,flash,request,redirect,session
main= Flask(
    __name__,
    static_folder="static", #靜態檔案資料夾的名稱
    static_url_path="/static", #靜態檔案對應的網址路徑
    template_folder="html"
    )
main.secret_key = 'some_secret_key'

@main.route("/")
def mainrun():
    return render_template("main.html")

if __name__=="__main__":
    main.run(debug=True)
