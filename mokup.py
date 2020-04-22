from pymongo import MongoClient

from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbhi


def insert():
    doc = {'img_url': '',
           'name': '',
           'price': '',
           'menu': ''}

    db.dinings.insert_one(doc)



for i in  range(1,10):
    insert()


