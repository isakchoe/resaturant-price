from pymongo import MongoClient

from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbhi





## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('home.html')


@app.route('/test')
def test():
    return render_template('test.html')


## API 역할을 하는 부분
@app.route('/api/post', methods=['POST'])
def test_post():
    return jsonify({'result': 'success', 'msg': '이 요청은 POST!'})


@app.route('/api/list', methods=['GET'])
def di_get():
    # 1. mystar 목록 전체를 검색합니다. ID는 제외하고 like 가 많은 순으로 정렬합니다.
    dinings = list(db.dinings.find({}, {'_id': False}))
    # 2. 성공하면 success 메시지와 함께 stars 목록을 클라이언트에 전달합니다.
    return jsonify({'result': 'success', 'di_list': dinings})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
