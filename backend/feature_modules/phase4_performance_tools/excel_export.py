# Export user data to Excel
import pandas as pd
def export_scores(scores):
    df = pd.DataFrame(scores)
    df.to_excel('scores.xlsx')
    return 'scores.xlsx'