@echo off

rem Start program
start cmd /k "npm start"
echo Wait to start the program
timeout /t 5

rem Start google chrome
start chrome http://localhost:3000

echo The program start successfully
