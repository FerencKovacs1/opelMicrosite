from flask import Flask, render_template, request, flash, redirect, url_for

application = Flask(__name__)
app = application


@app.route('/')
def main():
    return render_template("main.html")





if __name__  == '__main__':
    app.run(debug=True)
