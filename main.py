import pandas as pd

# Read the CSV file
df = pd.read_csv(r"C:\Users\342423985\Documents\test.csv")

# Extract names and numbers into separate lists
names = df['Name'].tolist()
numbers = df['Number'].tolist()

print("const students_Names = [", names + "]")
print("const students_Nums = [", numbers + "]")
