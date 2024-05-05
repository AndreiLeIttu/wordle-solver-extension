# Wordle unlimited Chrome extension (Functional, but work in progress)

This Google Chrome extension can solve the popular Wordle game automatically. Whether you want the whole solution, or just the best word in your current situation, this extension can help you beat the game. It is currently configured to work on [Wordle Unlimited](https://wordleunlimited.org/), a version of the game where you are not limited to only playing once a day.

## How to install and configure
You have two choices: 
1. Install the extension directly via the chrome web store - [direct link to extension be added] 

2. If you want to manually play around with the code or test the extension yourself, you can also follow the following steps to get it working: 
    
    2.1 Fork this repository
    2.2 Enter the extensions menu in Google Chrome, and after selecting **Developer Mode**, click the **Load unpacked** button 
    2.3 Select the extension directory

## How to use
After successfully installing the extension, you can navigate to https://wordleunlimited.org/, and after closing the initial popup from the website, you can press the extension icon whenever you want. The extension should complete the next word, choosing an option that eliminates as many choices as possible. Currently, you have to retype the word yourself, but in future versions the extension might press enter after it automatically as well.

You can either press the icon 6 times, retyping the word after each press, and let it basically play by itself, or only choose to press it when you think you need some help. Have fun!

## To be added 
- Better evaluation function for each word to improve chances of succes (maybe based on frequency of each letter per column)
- Extension presses Enter after typing the word
- Keyboard shortcut as an alternative to pressing the extension icon
- Popup with more options