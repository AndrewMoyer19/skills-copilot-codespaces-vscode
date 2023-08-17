function skillsMember() {
    var member = {
        name: 'John Doe',
        age: 30,
        address: '123 Main St'
    };

    var skills = {
        languages: ['JavaScript', 'Python', 'Java'],
        isProgrammer: true,
        yearsExperience: 5
    };

    // Add the skills object to the member object
    member.skills = skills;

    // Add a method to the member object called getSkills
    // This method should return the skills object
    member.getSkills = function() {
        return this.skills;
    };

    // Return the member object
    return member;
}
