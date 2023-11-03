interface CharacterListInterface{
    [key: string]: any
}

export const DefaultCharacterList: CharacterListInterface = {
    "bot" : require("./bot.png"),
    "assistant" : require("./bot.png"),
    "user": require("./user.png"),
};

export const CharacterList: CharacterListInterface = {
    "customer_service": require("./customer_service.png"),
    "doctor": require("./doctor.png"),
    "english_teacher": require("./english_teacher.png"),
    "police": require("./police.png"),
    "scientist": require("./scientist.png"),
    "software_engineer": require("./software_engineer.png"),
    "kindergarten_teacher": require("./kindergarten_teacher.png"),
    "techician": require("./technician.png"),
};

export const SpecialCharacterList: CharacterListInterface = {
    "custom": require("./custom.png")
}

export const AllCharacterList: CharacterListInterface = {
    ...DefaultCharacterList,
    ...CharacterList,
};

export const getCharacterImage = (key: string) => {
    if (! (key in AllCharacterList))
        return SpecialCharacterList.custom;
    return AllCharacterList[key];
}