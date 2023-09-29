import inquirer from 'inquirer';


class ATM {
    private balance: number;
    private pin: string;

    constructor(initialBalance: number, pin: string) {
        this.balance = initialBalance;
        this.pin = pin;
    }

    checkBalance(): number {
        return this.balance;
    }

    withdraw(amount: number): void {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrawn $${amount}. New balance: $${this.balance}`);
        } else {
            console.log("Insufficient funds.");
        }
    }

    changePin(newPin: string): void {
        this.pin = newPin;
        console.log("PIN changed successfully.");
    }
}

const atm = new ATM(1000, '1234'); // Initial balance is $1000, PIN is '1234'

async function main() {
    const { pin } = await inquirer.prompt([
        {
            type: 'input',
            name: 'pin',
            message: 'Enter your PIN:',
            mask: '*' // Mask input for security
        }
    ]);

    if (pin !== pin) {
        console.log("Incorrect PIN. Exiting.");
        return;
    }

    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Select an action:',
            choices: ['Check Balance', 'Withdraw', 'Change PIN']
        }
    ]);

    switch (action) {
        case 'Check Balance':
            console.log(`Your balance is: $${atm.checkBalance()}`);
            break;
        case 'Withdraw':
            const { amount } = await inquirer.prompt({
                type: 'number',
                name: 'amount',
                message: 'Enter the withdrawal amount:'
            });
            atm.withdraw(amount);
            break;
        case 'Change PIN':
            const { newPin } = await inquirer.prompt({
                type: 'password',
                name: 'newPin',
                message: 'Enter your new PIN:'
            });
            atm.changePin(newPin);
            break;
        default:
            console.log("Invalid action.");
    }

    main(); // Restart the main function for further actions
}

main();
