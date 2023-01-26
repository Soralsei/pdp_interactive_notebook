# Sleep Content Analysis (or any other construct)

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/Soralsei/pdp.interactive_notebook/master)

## Description
The data and notebook contained in this repository foster the reproducibility of the following paper: 

* Gauld C, Martin VP, Richaud A, Bailleul S, Lucie V, Perromat JL, et al. Systematic Item Content and Overlap Analysis of Self-reported Multiple Sleep Disorders Screening Questionnaires in Adults. *Journal of Clinical Medicine*. 2022 (Under review) 


Furthermore, to give the community a useful tool that can be used by any clinicians without any knowledge of coding, we set up a 👉[Binder repository](https://mybinder.org/v2/gh/Soralsei/pdp.interactive_notebook/master)👈, guiding the reader to run the code in a fully online environemnent. This code does not limit to Sleep content analysis and can be ran on any dataset formatted the following way.


## File formatting
* Excel file, uploaded to binder;
* The three first columns must be respextively:
   * the category of symptoms (put an empty first columns in your file if you do not categorize symptoms)
   * the abbreviations that will be plotted on the radial figure
   * the name of the symptoms
* Each columns represent a questionnaire or a reference classification
* Each cell contains either 
   * 0 if the symptoms is not in the questionnaire
   * 1 if the symptoms is *specific* in the questionnaire (i.e. the symptom has been found in an item of the questionnaire referring only to this symptom)
   * 2 if the symptom is *compound* in the questionnaire (i.e. the symptom has been found in an item of the questionnaire referring to at least two symptoms)


Example : 

| Category | Ab  | Symptom | SDQ | ICSD | ASQ | GSAQ | HSDQ | PSQI | Sleep50 | DSM | SDS-CL-25 | ISDI | SDS-CL-17 | BNSQ | OSQ | SSC |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SLEEPINESS SYMPTOMS | S01 | Daytime sleepiness | 1   | 1   | 1   | 2   | 2   | 1   | 1   | 1   | 2   | 1   | 2   | 1   | 1   | 1   |
| SLEEPINESS SYMPTOMS | S02 | Lapses into sleep | 2   | 1   | 0   | 2   | 1   | 0   | 1   | 1   | 1   | 1   | 1   | 1   | 0   | 1   |
| SLEEPINESS SYMPTOMS | S03 | Long sleep time | 1   | 1   | 2   | 0   | 2   | 2   | 0   | 1   | 0   | 0   | 0   | 2   | 2   | 0   |
| SLEEPINESS SYMPTOMS | S04 | Sleep inertia | 1   | 1   | 0   | 0   | 2   | 0   | 0   | 1   | 0   | 1   | 0   | 1   | 0   | 0   |
| INSOMNIA SYMPTOMS | S05 | Insomnia early | 1   | 1   | 2   | 0   | 0   | 2   | 1   | 1   | 1   | 1   | 1   | 1   | 1   | 1   |


## HTML files
The analyse files corresponding to the [current study](https://raw.githack.com/vincentpmartin/sleep-content-analysis/main/results_notebook_html/GauldMartin2022.html) and of the [seminal paper from Eiko Fried (2017)](https://raw.githack.com/vincentpmartin/sleep-content-analysis/main/results_notebook_html/Fried2017.html) are available in this repository. <br>
The figures and tables produced by this code are available in the [./tables_and_figures](./tables_and_figures) folder. 

If you want to customize the code or run the analysis on your own data, please read 👇 next Section 👇

## How to use our code

* If you are are familiar with Jupyter Notebooks, just download the notebook and the excel file, and *voila*.

* If you do not even know what a Jupyer Notebook is, please click on 👉[this link](https://mybinder.org/v2/gh/vincentpmartin/sleep-content-analysis/main?labpath=jupyter_notebook_sleep_content_analysis.ipynb)👈, wait a few second for the binder server to launch, and follows the instructions in the notebook. 

## Contact
If you have trouble reproducing our results or launching the code on your own data, do not hesitate to contact us !
* vincentpmartin [at] protonmail.com

## Reference
If you use this script, please cite the following paper : 
* Gauld C, Martin VP, Richaud A, Bailleul S, Lucie V, Perromat JL, et al. Systematic Item Content and Overlap Analysis of Self-reported Multiple Sleep Disorders Screening Questionnaires in Adults. *Journal of Clinical Medicine*. 2022 (Under review)
 
---
