from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app)

# -------------------------------------------------------------------
# 1) LOAD & PREPARE DATA (EXCEPT DATE)
#    You downloaded "synthetic_forecast_data_1000.csv" earlier.
# -------------------------------------------------------------------
df = pd.read_csv("PatoplorerData.csv")

# The columns are something like:
# [
#   "Date",
#   "Temperature",
#   "Weather",
#   "Breed",
#   "Housing",
#   "No. of Ducks",
#   "Feed Type",
#   "Kg of feeds / day",
#   "Nutrients",
#   "Nutrients in mL / day",
#   "No. of Eggs"
# ]

# We drop "Date" since we don't need it for training.
df.drop(columns=["Date"], inplace=True)

# Separate target
y = df["No. of Eggs"]
X = df.drop(columns=["No. of Eggs"])

# Identify categorical columns
cat_cols = ["Weather", "Breed", "Housing", "Feed Type", "Nutrients"]

# Encode them (LabelEncoder or OneHotEncoder). Here we use LabelEncoder for brevity.
label_encoders = {}
for col in cat_cols:
    le = LabelEncoder()
    X[col] = le.fit_transform(X[col])
    label_encoders[col] = le

# X now contains numeric columns for the regressor.
# Train the Random Forest
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X, y)

# -------------------------------------------------------------------
# 2) PREDICTION ENDPOINT WITH MULTIPLE RECOMMENDATIONS
# -------------------------------------------------------------------
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # The incoming JSON should have keys matching the columns of X.
        incoming = request.json
        # Example:
        # {
        #   "Temperature": 29.5,
        #   "No. of Ducks": 1605,
        #   "Feed Type": "AvialisCP18",
        #   "Kg of feeds / day": 50,
        #   "Nutrients": "antibiotics",
        #   "Nutrients in mL / day": 530,
        #   "Weather": "sunny",
        #   "Breed": "Mixed",
        #   "Housing": "indoor"
        # }

        # Convert incoming data to a DataFrame
        input_df = pd.DataFrame([incoming])

        # Ensure the DataFrame has the required column order.
        input_df = input_df[[ "Temperature",
                              "Weather",
                              "Breed",
                              "Housing",
                              "No. of Ducks",
                              "Feed Type",
                              "Kg of feeds / day",
                              "Nutrients",
                              "Nutrients in mL / day"
                            ]]

        # Apply the same label encoders for categorical columns.
        for col in cat_cols:
            # Check if the category is recognized.
            val = input_df[col].iloc[0]
            if val not in label_encoders[col].classes_:
                return jsonify({"error": f"Unrecognized category '{val}' for '{col}'"}), 400
            # Transform the column using the fitted label encoder.
            input_df[col] = label_encoders[col].transform(input_df[col])

        # Predict the number of eggs.
        prediction = model.predict(input_df)
        result = int(prediction[0])

        # Generate recommendations based on each input
        recommendations = []

        # Temperature recommendation
        temp = incoming.get("Temperature")
        if temp is not None:
            if temp < 15:
                recommendations.append("Temperature is too low; consider raising the ambient temperature.")
            elif temp > 35:
                recommendations.append("Temperature is too high; consider cooling measures.")
            else:
                recommendations.append("Temperature is within the optimal range.")

        # No. of Ducks recommendation
        ducks = incoming.get("No. of Ducks")
        if ducks is not None:
            if ducks < 50:
                recommendations.append("Duck count is low; consider increasing the number of ducks for better productivity.")
            elif ducks > 1700:
                recommendations.append("Duck count is high; ensure there is adequate space and resources.")
            else:
                recommendations.append("Duck count is within the optimal range.")

        # Kg of feeds / day recommendation
        feed_kg = incoming.get("Kg of feeds / day")
        if feed_kg is not None:
            if feed_kg < 10:
                recommendations.append("Feed amount is low; consider increasing the feed quantity.")
            elif feed_kg > 100:
                recommendations.append("Feed amount is high; monitor feed usage to avoid wastage.")
            else:
                recommendations.append("Feed amount is within the recommended range.")

        # Nutrients in mL / day recommendation
        nutrients_ml = incoming.get("Nutrients in mL / day")
        if nutrients_ml is not None:
            if nutrients_ml < 100:
                recommendations.append("Nutrient volume is low; consider supplementing additional nutrients.")
            elif nutrients_ml > 1000:
                recommendations.append("Nutrient volume is high; adjust to prevent overfeeding.")
            else:
                recommendations.append("Nutrient volume is optimal.")

        # Weather recommendation
        weather = incoming.get("Weather", "").lower()
        if weather:
            if "rain" in weather:
                recommendations.append("Weather is rainy; ensure proper shelter for the ducks.")
            elif "sunny" in weather:
                recommendations.append("Weather is sunny; make sure ducks stay well hydrated.")
            else:
                recommendations.append("Weather conditions appear normal.")

        # Breed recommendation
        breed = incoming.get("Breed", "").lower()
        if breed:
            if breed not in ["mixed", "layer a", "layer b"]:
                recommendations.append("Breed is non-standard; consider using recommended breeds for optimal production.")
            else:
                recommendations.append("Breed is within the recommended types.")

        # Housing recommendation
        housing = incoming.get("Housing", "").lower()
        if housing:
            if housing not in ["indoor", "outdoor"]:
                recommendations.append("Housing type is non-standard; consider using either indoor or outdoor housing.")
            else:
                recommendations.append("Housing is appropriate.")

        # Feed Type recommendation (generic recommendation)
        feed_type = incoming.get("Feed Type", "").lower()
        if feed_type:
            recommendations.append("Ensure the feed type meets the ducks' nutritional needs.")

        # Nutrients recommendation (generic recommendation)
        nutrients = incoming.get("Nutrients", "").lower()
        if nutrients:
            recommendations.append("Verify that the nutrients provided are adequate for duck health.")

        # Return the predicted eggs and the list of recommendations
        return jsonify({"predicted_eggs": result, "suggestions": recommendations})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# -------------------------------------------------------------------
# 3) MAIN
# -------------------------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True)
