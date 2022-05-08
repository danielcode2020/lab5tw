CREATE TABLE `books`(
    `id` int(11) not null AUTO_INCREMENT,
    `title` varchar(100),
    `author` varchar(100),
    `price` varchar(10),
    PRIMARY KEY (`id`)
)

INSERT into books values
('1','Harry Potter','Anne Marie','200'),
('3','A game of thrones','D&D','400'),
('2','Sherlock Holmes','Watson','300')

/*
{
    "title" : "JAVA Basics",
    "author" : "Baeldung",
    "price" : "1000";
}
*/