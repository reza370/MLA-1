FROM  python:latest
WORKDIR /root/
RUN apt update && apt upgrade -y
RUN apt install python3 python3-pip -y
RUN pip3 install ipykernel
RUN pip3 install numpy
RUN pip3 install pandas
RUN pip3 install seaborn
RUN pip3 install scikit-learn
Run pip3 install ppscore
CMD tail -f /dev/null