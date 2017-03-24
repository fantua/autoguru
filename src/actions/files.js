import Parse from 'parse';

export const upload = (file) => function () {
    const parseFile = new Parse.File(file.size, file);

    return parseFile.save();
};
