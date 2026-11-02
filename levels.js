// Level content, transcribed from "What to Learn on Guitar in Order (Complete Roadmap)".
// Item/song/video ids must stay stable once published — your ticks are saved against them.
//
// Songs marked "From your sheet" come straight from the PDF; the others are extra picks
// that suit the level. Song links open a YouTube search for a lesson on that song.
(() => {
  const yt = (q) => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
  const SHEET = 'From your sheet';
  const song = (id, title, artist, why, q) => ({ id, title, artist, why, url: yt(q || `${title} ${artist} guitar lesson`) });
  const vid = (id, title, url) => ({ id, title, url: 'https://www.youtube.com/watch?v=' + url });

  window.LEVELS = [
    {
      id: 'l1', name: 'First steps', summary: 'Getting comfortable with the instrument.',
      items: [
        { id: 'l1-1', text: 'The parts of the guitar' },
        { id: 'l1-2', text: 'How to hold the guitar and the pick' },
        { id: 'l1-3', text: 'How to strum (up strums and down strums)' },
        { id: 'l1-4', text: 'How to fret (one note at a time AND multiple notes at a time)' },
        { id: 'l1-5', text: 'How to pick single notes' },
        { id: 'l1-6', text: 'What is a note? How many are there?' },
        { id: 'l1-7', text: 'What are intervals? Half step vs whole step', note: 'Practise hearing the difference, including across different instruments' },
        { id: 'l1-8', text: 'How to tune your guitar', note: 'Basic guitar maintenance' },
      ],
      songs: [
        song('s-l1-1', 'Ode to Joy', 'Beethoven', 'Single-note melody on one or two strings', 'Ode to Joy easy guitar single notes'),
        song('s-l1-2', 'Smoke on the Water riff (one string)', 'Deep Purple', 'Single-string version to practise fretting & picking', 'Smoke on the Water one string guitar'),
      ],
      videos: [
        vid('v-l1-1', 'Guitar 101: Parts of the Guitar Explained', 'eCtzR52HAis'),
        vid('v-l1-2', 'How to Hold a Guitar Pick (Beginner Guitar Lesson)', 'N0Hl9lfD0NE'),
        vid('v-l1-3', 'How to Tune a Guitar for Beginners', '3r6OqW7Rmmw'),
        vid('v-l1-4', 'Half Steps and Whole Steps on Guitar – Music Theory Basics', 'FaKKmDLwlH4'),
        vid('v-l1-5', 'Guitar 101: How to Hold a Pick and Strumming for Beginners', 'v2YCNuY4k18'),
      ],
    },
    {
      id: 'l2', name: 'Open chords & rhythm', summary: 'Your first chords and strumming in time.',
      items: [
        { id: 'l2-1', text: 'What is a chord?' },
        { id: 'l2-2', text: 'Basic open chords: E, Em, A, Am, G, C, D' },
        { id: 'l2-3', text: 'Intro to rhythm and how to apply it to strumming', note: 'You can also apply this to single notes' },
        { id: 'l2-4', text: 'How to change your strings (and how often to do it)' },
      ],
      songs: [
        song('s-l2-1', "For What It's Worth", 'Buffalo Springfield', SHEET),
        song('s-l2-2', 'Wagon Wheel', 'Darius Rucker / Old Crow Medicine Show', SHEET),
        song('s-l2-3', 'Smoke on the Water', 'Deep Purple', SHEET),
        song('s-l2-4', 'Seven Nation Army', 'The White Stripes', SHEET),
        song('s-l2-5', 'Iron Man', 'Black Sabbath', SHEET),
        song('s-l2-6', 'Knockin’ on Heaven’s Door', 'Bob Dylan', 'G, D, Am, C — great for chord changes'),
        song('s-l2-7', 'Bad Moon Rising', 'Creedence Clearwater Revival', 'D, A, G with a steady strum'),
      ],
      videos: [
        vid('v-l2-1', 'Easy Guitar Chords – G, C, D, Em – Beginner Lesson', 'tw09AanVXQo'),
        vid('v-l2-2', 'Open Minor Chords (Em, Am, Dm)', 'NpbfRJsx24Y'),
        vid('v-l2-3', 'Your FIRST Strumming Pattern EVER! (JustinGuitar)', 'n45PDizCRLw'),
        vid('v-l2-4', '3 Essential Strumming Patterns – Beginner Guitar Lessons', '6C2WFkVESBk'),
        vid('v-l2-5', 'How to Change Your Acoustic Guitar Strings', '0xxeRFEP1Y4'),
      ],
    },
    {
      id: 'l3', name: 'Scales, keys & picking', summary: 'Your first scale and finding notes on the neck.',
      items: [
        { id: 'l3-1', text: 'What is a scale?' },
        { id: 'l3-2', text: 'What is a key?' },
        { id: 'l3-3', text: 'First position minor pentatonic scale' },
        { id: 'l3-4', text: 'Alternate picking' },
        { id: 'l3-5', text: 'All the notes on the low E string' },
      ],
      songs: [
        song('s-l3-1', 'Sweet Home Alabama', 'Lynyrd Skynyrd', SHEET),
        song('s-l3-2', 'Running Down a Dream', 'Tom Petty & The Heartbreakers', SHEET),
        song('s-l3-3', 'House of the Rising Sun', 'The Animals', SHEET),
        song('s-l3-4', 'Highway to Hell', 'AC/DC', SHEET),
        song('s-l3-5', 'Hurt', 'Johnny Cash', SHEET),
        song('s-l3-6', 'Sunshine of Your Love', 'Cream', 'Riff built from the minor pentatonic'),
      ],
      videos: [
        vid('v-l3-1', 'Minor Pentatonic Scale Position 1 (Lead Guitar Lesson)', 'z_MhORl8Zmg'),
        vid('v-l3-2', 'Learn Minor Pentatonic Scale Easily + Backing Track', 'oVDMzKTjjew'),
        vid('v-l3-3', 'Beginning Guitar Lesson: Alternate Picking', 'S6_wziT6ONk'),
        vid('v-l3-4', 'Guitar Lesson: Notes On The Low E String', 'lnYcvfF7aVw'),
        vid('v-l3-5', 'How to Find the Key of a Song (Easy Beginner Method)', 'D2Hd1VRsIPw'),
      ],
    },
    {
      id: 'l4', name: 'Barre chords & first solos', summary: 'Moveable chords, the A string, and soloing over tracks.',
      items: [
        { id: 'l4-1', text: 'Second position major pentatonic scale' },
        { id: 'l4-2', text: 'Barre chords – major and minor with 5th & 6th string roots', note: 'Now is the time to learn that chords are built from triads' },
        { id: 'l4-3', text: 'All the notes on the A string' },
        { id: 'l4-4', text: 'Identify the key by ear' },
        { id: 'l4-5', text: 'Start soloing over backing tracks' },
      ],
      songs: [
        song('s-l4-1', 'Sultans of Swing', 'Dire Straits', 'From your sheet — solo over it', 'Sultans of Swing backing track guitar'),
        song('s-l4-2', 'Layla', 'Eric Clapton', 'From your sheet — solo over it', 'Layla backing track guitar'),
        song('s-l4-3', 'Wish You Were Here', 'Pink Floyd', 'From your sheet — solo over it', 'Wish You Were Here backing track guitar'),
        song('s-l4-4', 'Whole Lotta Love', 'Led Zeppelin', 'From your sheet — solo over it', 'Whole Lotta Love backing track guitar'),
        song('s-l4-5', 'Creep', 'Radiohead', 'Major & minor barre chords in one song'),
      ],
      videos: [
        vid('v-l4-1', 'Barre Chord Lesson – A-Shapes & E-Shapes + Bonus Chords', 'uQYNqg_5jNI'),
        vid('v-l4-2', 'Minor Barre Chords – Em Shape & Am Shape', 'CB636zsaxvw'),
        vid('v-l4-3', 'Learning Notes on the E and A Strings', 'iwDthuCRMjc'),
        vid('v-l4-4', 'Find the Key of Any Song in 30 Seconds (By Ear)', 'lYtZxy-bqNY'),
        vid('v-l4-5', 'Major Pentatonic – The Key To Melodic Soloing', 'nAi2ZahfsL0'),
      ],
    },
    {
      id: 'l5', name: 'Whole-neck pentatonic & technique', summary: 'All five shapes, diatonic scales and expressive techniques.',
      items: [
        { id: 'l5-1', text: 'All 5 positions of the pentatonic scale', note: "There are only 3 new ones at this point" },
        { id: 'l5-2', text: 'Major and minor diatonic scales' },
        { id: 'l5-3', text: 'Difference between relative and parallel minor/major' },
        { id: 'l5-4', text: 'Bends' },
        { id: 'l5-5', text: 'Vibrato' },
        { id: 'l5-6', text: 'Hammer-ons & pull-offs' },
        { id: 'l5-7', text: 'Natural harmonics' },
        { id: 'l5-8', text: 'Pinch harmonics' },
        { id: 'l5-9', text: 'Music theory: how to build the major scale and pentatonic scales' },
      ],
      songs: [
        song('s-l5-1', 'Comfortably Numb (2nd solo)', 'Pink Floyd', 'Bends and vibrato across the pentatonic shapes'),
        song('s-l5-2', 'Cocaine', 'Eric Clapton', 'Pentatonic riff with bends'),
        song('s-l5-3', 'La Grange', 'ZZ Top', 'Pinch harmonics and hammer-ons'),
      ],
      videos: [
        vid('v-l5-1', 'The Five Positions of the Minor Pentatonic Scale – The EASY Way', 'jVzYUUHRaRw'),
        vid('v-l5-2', 'The Pentatonic Cheat Code – All 5 Patterns of Major & Minor', 'T8yodJjWT5c'),
        vid('v-l5-3', 'Lead Effects: Vibrato, Bend, Slide, Hammer-on, Pull-off', 'UH6VN7SobTE'),
        vid('v-l5-4', 'Relative Minor vs. Parallel Minor Scales', 'zLUL_YS0A-o'),
      ],
    },
    {
      id: 'l6', name: 'Harmony & progressions', summary: 'How chords in a key work together.',
      items: [
        { id: 'l6-1', text: 'Harmonize the major scale' },
        { id: 'l6-2', text: 'The Nashville Number System' },
        { id: 'l6-3', text: 'The functions of different chords / functional harmony' },
        { id: 'l6-4', text: 'Use function to hear chord changes' },
        { id: 'l6-5', text: 'Common chord progressions' },
        { id: 'l6-6', text: 'Compound time signatures' },
      ],
      songs: [
        song('s-l6-1', 'Let It Be', 'The Beatles', 'The classic I–V–vi–IV progression'),
        song('s-l6-2', 'Nothing Else Matters', 'Metallica', 'Compound time (6/8)'),
        song('s-l6-3', 'Free Fallin’', 'Tom Petty', 'I–IV movement, easy to hear by function'),
      ],
      videos: [
        vid('v-l6-1', 'Harmonizing the Major Scale – Basic Guitar Lesson', 'oPHwi-tJGYY'),
        vid('v-l6-2', 'The Nashville Number System Explained (Complete Guide for Guitarists)', 'NjYEEqqe30E'),
        vid('v-l6-3', 'Chord Families – Tonic, Sub Dominant, and Dominant', 'siidWf_N3zM'),
        vid('v-l6-4', '5 Chord Progressions You REALLY Should Know! (JustinGuitar)', 'ThwuNjbJB00'),
        vid('v-l6-5', 'Understanding 6/8, 9/8 and 12/8 (Compound) Time Signatures', 'cItjWpgDTTk'),
      ],
    },
    {
      id: 'l7', name: 'Seventh chords', summary: 'From triads to 7ths.',
      items: [
        { id: 'l7-1', text: 'Recap triads: the 1st, 3rd and 5th, then introduce the 7th' },
        { id: 'l7-2', text: 'How sevenths apply to triads' },
        { id: 'l7-3', text: 'Play seventh chords – major, minor, dominant with 5th & 6th string roots' },
        { id: 'l7-4', text: 'The dominant chord and its place in the harmonized major scale' },
      ],
      songs: [
        song('s-l7-1', 'Sweet Home Chicago', 'Robert Johnson / Blues Brothers', 'Dominant 7th blues shuffle'),
        song('s-l7-2', 'Isn’t She Lovely', 'Stevie Wonder', 'Minor 7th chord progression'),
        song('s-l7-3', 'Something', 'The Beatles', 'Major 7th and dominant 7th chords'),
      ],
      videos: [
        vid('v-l7-1', 'Build Your Own 7th Chords • Guitar Theory', '10yqeG8_f1U'),
        vid('v-l7-2', "Guitar Chord Demo: '7th' Barre Shapes (three types)", 'epcmtE8DeO4'),
        vid('v-l7-3', 'A Shape Barre Chords: Dominant 7ths (perfect for Blues!)', 'X8y6qz9tN6A'),
        vid('v-l7-4', 'Harmonizing The Major Scale Using 7th Chords', '-y3zJ-1yEMI'),
      ],
    },
    {
      id: 'l8', name: 'Modes & intervals', summary: 'Completing melodic ear training.',
      items: [
        { id: 'l8-1', text: 'The 7 modes (and the theory behind them)' },
        { id: 'l8-2', text: 'All the scale intervals' },
        { id: 'l8-3', text: 'Hear melodies and solos', note: 'This completes melodic ear training' },
      ],
      songs: [
        song('s-l8-1', 'Oye Como Va', 'Santana', 'Dorian mode'),
        song('s-l8-2', 'Scarborough Fair', 'Simon & Garfunkel', 'Dorian melody'),
        song('s-l8-3', 'Norwegian Wood', 'The Beatles', 'Mixolydian melody'),
      ],
      videos: [
        vid('v-l8-1', 'Guitar Lesson: A Guide to the Seven Modes of the Major Scale', 'oF9TYm0Ck9U'),
        vid('v-l8-2', 'Modes Explained Fast and Easy (GuitArmy)', 'dtJ6FfC88Wc'),
        vid('v-l8-3', 'Interval EAR TRAINING For Guitar In 7 Minutes', 'j5wPKsrkGvc'),
        vid('v-l8-4', 'Ear Training in 4 Levels – Beginner to Pro', 'wyzOsIlzIRk'),
      ],
    },
    {
      id: 'l9', name: 'CAGED & chord tones', summary: 'Mapping the whole fretboard around chords.',
      items: [
        { id: 'l9-1', text: 'The CAGED system' },
        { id: 'l9-2', text: 'Arpeggios related to CAGED shapes' },
        { id: 'l9-3', text: 'Use chord tones in a solo or melody to accentuate the chords in the song' },
        { id: 'l9-4', text: 'Add the 7th to your arpeggios' },
        { id: 'l9-5', text: 'Hear and identify harmonic parts', note: 'Is the bass doing something different from the guitar? Piano vs guitar? Is the recording sped up?' },
      ],
      songs: [
        song('s-l9-1', 'Little Wing', 'Jimi Hendrix', 'Chord-shape embellishments up the neck'),
        song('s-l9-2', 'Wonderful Tonight', 'Eric Clapton', 'Melodic chord-tone lines'),
        song('s-l9-3', 'Jessica', 'The Allman Brothers Band', 'Major-key melody built on chord tones'),
      ],
      videos: [
        vid('v-l9-1', 'The CAGED System Explained: Own Your Fretboard in 5 Positions', 'yWEQbl635NM'),
        vid('v-l9-2', 'How to Actually USE the CAGED System – A Practical Guide', 'JR1TgDAiCFU'),
        vid('v-l9-3', 'Arpeggios Corresponding to CAGED Shapes (& what to do with them)', 'aLE_9ij2AmI'),
        vid('v-l9-4', 'Master Chord Tone Soloing The EASY Way', 'Kj9qp0LyQbA'),
      ],
    },
    {
      id: 'l10', name: 'Extensions & minor scales', summary: 'Advanced harmony — then make it yours.',
      items: [
        { id: 'l10-1', text: 'Chord extensions beyond the seventh (9ths, 11ths and 13ths)' },
        { id: 'l10-2', text: 'Harmonic minor scale – its modes and arpeggios' },
        { id: 'l10-3', text: 'Melodic minor scale – its modes and arpeggios' },
        { id: 'l10-4', text: 'Relationship between harmonic, melodic and natural minor scales' },
        { id: 'l10-5', text: 'Specialize in a specific genre' },
      ],
      songs: [
        song('s-l10-1', 'Smooth', 'Santana ft. Rob Thomas', 'Harmonic minor flavour in the solos'),
        song('s-l10-2', 'Autumn Leaves', 'Jazz standard', '7ths and extensions; minor ii–V–i'),
        song('s-l10-3', 'Europa', 'Santana', 'Expressive minor-key melody'),
      ],
      videos: [
        vid('v-l10-1', 'You Understand Chord Extensions More Than You Think', 'vjRfVZDsHfY'),
        vid('v-l10-2', '3-Minute Theory #39: Harmonic Minor Scale', 'h-vidjPJZg0'),
        vid('v-l10-3', '3-Minute Theory #42: Writing Melodic Minor Scales', 'gexDJRUHOAs'),
        vid('v-l10-4', 'How to Hear & Use the Minor Scales (Natural, Melodic, Harmonic & Dorian)', 'AEXCpWLf4Gw'),
      ],
    },
  ];
})();
