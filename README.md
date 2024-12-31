# Minesweeper Challenge

This repository showcases a Minesweeper Challenge game where players select the number of mines to be placed randomly in a 5x5 grid of 25 tiles. Players select tiles without mines, and their placed amount is multiplied based on the number of correct selections.

## Game Rules

1. Players select the number number of mines in the 5x5 grid.
2. Players place an amount to bet.
3. Players select tiles one by one.
4. If a player selects a tile without a mine, their amount is multiplied based on the number of correct selections.
5. If a player selects a tile with a mine, the game ends and the player loses their bet.

## How to Play

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/minesweeper-challenge.git
    cd minesweeper-challenge
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the game:
    ```sh
    npm start
    ```

4. Follow the on-screen instructions to set the number of mines, place your bet, and start selecting tiles.

## Example

- Player sets desired number of mines.
- Player places a bet of $10.
- Player selects a tile without a mine, their amount is multiplied by 1.2.
- Player continues selecting tiles until they hit a mine or decide to cash out.
