/** ENEMIES
 * Ud - Up, Down
 * Du - Down, Up
 * checkpoint
 * Skrumblo - Left, Up, Right
 * Skrimblo - Right, Up, Left
 * checkpoint
 * Bonezo - Down, Down, Down
 * Bonelord - Down, Down, Up
 * checkpoint
 * Kon - Up, Up, Down, Down
 * Ami - Left, Right, Left, Right
 * checkpoint
 * Wizbirb - Up, Left, Down, Right
*/

// OBJECT LITERALS OF ALL ENEMIES

const ud = {
    name: "Ud",
    combo: ["W", "S"],
  };
  
  const du = {
    name: "Du",
    combo: ["S", "W"],
  };
  
  const skrumblo = {
    name: "Skrumblo",
    combo: ["A", "W", "D"],
  };
  
  const skrimblo = {
    name: "Skrimblo",
    combo: ["D", "W", "A"],
  };
  
  const bonezo = {
    name: "Bonezo",
    combo: ["S", "S", "S"],
  };
  
  const bonelord = {
    name: "Bonelord",
    combo: ["S", "S", "W"],
  };
  
  const kon = {
    name: "Kon",
    combo: ["W", "W", "S", "S"],
  };
  
  const ami = {
    name: "Ami",
    combo: ["A", "D", "A", "D"],
  };
  
  const wizbirb = {
    name: "Wizbirb",
    combo: ["W", "A", "S", "D"],
  };