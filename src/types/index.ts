export interface UserProps {
    id: string;
    email: string;
    appSettings?: {
        defaultCurrency: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}

export interface WalletProps {
    id: string;
    userId: UserProps["id"];
    name: String;
    balance: number;
    currency: String;
    icon: String;
    theme: String;
    interest?: number;
    note?: NoteProps;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface WalletInfoProps {
    id: WalletProps["id"];
    name: WalletProps["name"];
    balance: WalletProps["balance"];
}

export interface NoteProps {
    id: string;
    userId: UserProps["id"];
    type: "expense" | "income";
    theme: String;
    amount: Number;
    date: Date;
    description?: String;
    category: String;
    walletId?: WalletProps["id"];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface NoteInfoProps {
    id: NoteProps["id"];
    type: NoteProps["type"];
    amount: NoteProps["amount"];
    date: NoteProps["date"];
    category: NoteProps["category"];
    desciption: NoteProps["description"];
}
