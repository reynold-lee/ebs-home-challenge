FROM python:3.10-buster

COPY ./requirements.txt /requirements.txt

RUN pip install -r /requirements.txt
EXPOSE 8000
