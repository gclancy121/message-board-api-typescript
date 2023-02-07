
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('waifus').insert([
    {waifu_name: "Sachi Komine", waifu_description: "The site creator's personal favorite waifu. An athletic, short-haired, sarcastic tomboy battle maid. Yeah, she has her..issues. But every good waifu has at least one little aspect of insanity to them. She's kind, sweet, and she also canonically has the skills to defuse a bomb! What's not to love about her?", waifu_birth_month: "September", waifu_birth_day: '23', waifu_picture: "https://s2.vndb.org/ch/64/76364.jpg"},
    {waifu_name: "Revy (Rebecca Lee)", waifu_description: "She's a damn nutcase. She's loud, impulsive, rude, violent, angry, and she has no sense of diplomacy. She is unequivocally a terrible partner, but she has wormed her way into the hearts of a great many people, the creator of this website included. Everyone thinks Revy is great but nobody wants to deal with her issues.", waifu_birth_month: '', waifu_birth_day: '', waifu_picture: "https://i.pinimg.com/736x/55/6c/0b/556c0b5b3fbeb7df19676fc70e4bc206.jpg"},
    {waifu_name: "Roberta (Rosarita Cisneros)", waifu_description: "Now this woman is truly insane. I would go so far as to say that she is the scariest character in Black Lagoon. Her violence is hidden beneath the surface - someone who appears as an ordinary housemaid is in fact one of the most dangerous people in the world. And yet, I still can't help but like her. She is absolutely not someone you would ever want to meet in reality, but I still think that she's great.", waifu_birth_month:'', waifu_birth_day: "", waifu_picture: "https://i.pinimg.com/originals/30/d2/04/30d2045e4d84a9c846852cb3f4ae5d91.jpg"}
  ]);
};
