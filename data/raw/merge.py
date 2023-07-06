import pandas as pd

# Read the csv files
df1 = pd.read_csv("./macro_macro_topic_temp.csv", delimiter="|")
df2 = pd.read_csv("./sentiment_analysis_gradient.csv")

# Drop duplicate columns from the second dataframe
df2 = df2.drop(columns=["docs", "rating", "timestamp"])

# Merge the dataframes on key
merged = pd.merge(df1, df2, on="key")

# Check if the size of the merged dataframe is the same as the size of the original dataframes
if len(df1) != len(merged) or len(df2) != len(merged):
    print("Sizes of the merged dataframe and original dataframes don't match!")
else:
    print("Sizes match!")

# Write the merged dataframe to a json file
merged.to_json("../processed/labeled-reviews.json", orient="records")
