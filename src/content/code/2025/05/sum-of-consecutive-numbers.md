---
isDraft: false
title: 연속된 수의 합
pubDate: 2025-05-21
---

## 문제 설명

연속된 세 개의 정수를 더해 12가 되는 경우는 3, 4, 5입니다.
두 정수 num과 total이 주어집니다.
연속된 수 num개를 더한 값이 total이 될 때, 정수 배열을 오름차순으로 담아 return 하도록 solution 함수를 완성해보세요.

- num = 3, total = 12인 경우 [3, 4, 5]를 return 합니다.
- num = 5, total = 15인 경우 [1, 2, 3, 4, 5]를 return 합니다.
- 4개의 연속된 수를 더해 14가 되는 경우는 2, 3, 4, 5입니다.

## 제한사항

- 1 ≤ num ≤ 100
- 0 ≤ total ≤ 1000
- num 개의 연속된 수를 더하여 total이 될 수 없는 테스트 케이스는 없습니다.

## 솔루션 코드

#### Review Code
- 시간복잡도: O(n)
```java
class Solution {
    public int[] solution(int num, int total) {
        int[] answer = new int[num];

        int start = (total - (num * (num - 1) / 2)) / num;

        for (int i = 0; i < num; i++) {
            answer[i] = start + i;
        }

        return answer;
    }
}
```

#### Concept

```text
// Step 1
a + (a + 1) + (a + 2) + ... + (a + num - 1)
= num * a + (0 + 1 + 2 + ... + (num - 1))
= num * a + (num * (num - 1)) / 2

// Step 2
num * a + (num * (num - 1)) / 2 = total

// Step 3
a = (total - (num * (num - 1) / 2)) / num
```