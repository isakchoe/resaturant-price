from pymongo import MongoClient

from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbhi


def insert():
    doc = {'img_url': 'd',
           'name': '어흥',
           'price': '900',
           'menu': 'meat'}

    db.dinings.insert_one(doc)



insert()
