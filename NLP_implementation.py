# -*- coding: utf-8 -*-
"""
Created on Fri Aug 26 12:58:27 2022

@author: Kaushal_Rajendra_Shirode
"""

import nltk
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

nltk.download('wordnet')
nltk.download('omw-1.4')
nltk.download('stopwords')
nltk.download('punkt')
stop_words = set(stopwords.words('english'))

lemmatizer = WordNetLemmatizer()

grievances = ["Since our college is located in the outskirts of the city; public transport is not avaiable. Students have to walk around 3-4 km before they can get any bus or auto which hinders their safety. Therefore we need some sort of transport for our college.", "There are lot of students who wish to take admissions but are not able to due to their financial issues. Its impossible to provide help to with limited funds. Hence we request you to provide some funds for this.", "There is a District level football tournament which is being conducted next month and at the same time, UGC semester exams are also there. Many of our students are going to participate in that tournament. Due to the clash between tournament and exams, it's hard for students to give attention to both. Hence we request you to postpone the exams for 10 days so the students can perform in both tournament and exams."]

def lemmatizeSentence(sentence):
  returnString = ""
  for word in sentence:
    word = word.lower()
    if not word.lower() in stop_words:
      wordi = lemmatizer.lemmatize(word)
      returnString = returnString + " " + wordi
  return returnString[1:]

def countNumWords(sentence):
    l = word_tokenize(sentence)
    return len(l)

def returnIndex(givenProblemStatement):
    word_tokens = word_tokenize(givenProblemStatement)
    givenProblemStatement = lemmatizeSentence(word_tokens)
    word_tokens = word_tokenize(givenProblemStatement)

    index = 0
    count = 0

    for sentence in grievances:
        matchWords = 0
        for word in word_tokens:
            if word in sentence:
                matchWords = matchWords + 1
        if matchWords > count:
            count = matchWords
            index = index + 1
    percentage = (count/countNumWords(givenProblemStatement))*100

    if percentage > 80 :
        return index

if __name__ == "__main__":
    givenProblemStatement = "College located public transport"
    index = returnIndex(givenProblemStatement)
    print(index)
    

    