export function getSecondaryText(participantsCount: number) {
    let remainder = participantsCount % 100
    if (remainder >= 5 && remainder <= 20) {
        return 'участников'
    }
    remainder %= 10
    if (remainder === 1) return 'участник'
    if (remainder >= 2 && remainder <= 4) return 'участника'
    return 'участников'

}
