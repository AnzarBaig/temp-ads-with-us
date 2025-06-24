import WordRotate from '@/components/magicui/word-rotate'


function WordRotateComp() {

    const words = [" 1400MT OF TMT", " 330MT of Sand", " 5000Ton of Aggregates", "150MT of MS Plates"]


    return (
        <WordRotate
            className="text-md font-bold text-headupb2b dark:text-white ml-2" // Add margin here
            words={words}
        />
    )
}

export default WordRotateComp