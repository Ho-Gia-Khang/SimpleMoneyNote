export interface LoginProps {
    email: string;
    password: string;
}

export interface UserProps {
    id: string;
    email: string;
    appSettings?: {
        defaultCurrency: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}

export interface BookProps {
    id: string;
    userId: UserProps["id"];
    name: string;
}

export interface WalletProps {
    id: string;
    userId: UserProps["id"];
    name: string;
    balance: number;
    currency: string;
    icon: string;
    theme: string;
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
    theme: string;
    amount: number;
    date: Date;
    descriptions?: string;
    categoryId: string;
    currency: string;
    bookId: BookProps["id"];
    walletId?: WalletProps["id"];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface NoteInfoProps {
    id: NoteProps["id"];
    type: NoteProps["type"];
    amount: NoteProps["amount"];
    date: NoteProps["date"];
    currency: NoteProps["currency"];
    categoryId: NoteProps["categoryId"];
    descriptions?: NoteProps["descriptions"];
}

export interface CategoryProps {
    id: string;
    name: string;
    userId: UserProps["id"];
    type: "expense" | "income";
    theme: string;
    icon: string;
}
