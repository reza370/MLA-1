FROM  python:latest
WORKDIR /root/
RUN apt update && apt upgrade -y
RUN apt install python3 python3-pip -y
RUN pip3 install ipykernel
RUN pip3 install numpy
RUN pip3 install pandas
RUN pip3 install seaborn
RUN pip3 install scikit-learn
RUN pip3 install ppscore
RUN pip3 install shap
RUN pip3 install dash
RUN pip3 install jupyter dash
RUN pip3 install dash-bootstrap-components
RUN pip3 install dash-bootstrap-components[pandas]
RUN pip3 install dash_ag_grid 
CMD tail -f /dev/null