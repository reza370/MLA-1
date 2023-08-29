import numpy as np
import dash
from dash import Dash, html, dcc
from dash.dependencies import Input, Output, State
import joblib

app = dash.Dash(__name__)

layout = html.Div(
    [
        html.H1("Car Price Prediction"),
        html.Div(
            [
                html.Label("Max power (bhp):"),
                dcc.Input(id="max_power", type="number"),
            ]
        ),
        html.Div(
            [
                html.Label("Mileage (kmpl):"),
                dcc.Input(id="mileage", type="number"),
            ]
        ),
        html.Div(
            [
                html.Label("Car Age (year):"),
                dcc.Input(id="car_age", type="number"),
            ]
        ),
        html.Button("Submit", id="submit"),
        html.Div(id="car_price"),
    ]
)

# Load the trained model
model = joblib.load('model/Car_selling_price.model')  # Upload model's file name

# Create a callback function to predict the car price and display it on the page
@app.callback(
    Output("car_price", "children"),
    [Input("submit", "n_clicks")],
    [State("max_power", "value"), State("mileage", "value"), State("car_age", "value")],
)
def predict_car_price(n_clicks, max_power, mileage, car_age):
    if n_clicks is None or n_clicks == 0:
        return ""
    input_data = [[max_power, mileage, car_age]]
    #input_data = model['scaler'].transform(input_data)
    car_price = np.exp(model.predict(input_data))
    formatted_car_price = int(car_price[0])

    return f"The predicted car price is: ${formatted_car_price}"
    
# Run the app
if __name__ == "__main__":
    app.layout = layout  
    app.run_server(debug=True)