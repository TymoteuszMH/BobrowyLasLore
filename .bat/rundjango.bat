@echo off
cd ..\API"
call BLLenv\Scripts\activate & python -m pip install -r requirements.txt & python BLLapi\manage.py runserver
