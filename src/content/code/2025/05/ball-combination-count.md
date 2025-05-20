---
isDraft: false
title: 구슬을 나누는 경우의 수
pubDate: 2025-05-19
---

## 문제 설명

머쓱이는 구슬을 친구들에게 나누어주려고 합니다.
구슬은 모두 다르게 생겼습니다.
머쓱이가 갖고 있는 구슬의 개수 balls와 친구들에게 나누어 줄 구슬 개수 share이 매개변수로 주어질 때, balls개의 구슬 중 share개의 구슬을 고르는 가능한 모든 경우의 수를 return 하는 solution 함수를 완성해주세요.

- 서로 다른 구슬 3개 중 2개를 고르는 경우의 수는 3입니다.
- 서로 다른 구슬 5개 중 3개를 고르는 경우의 수는 10입니다.

## 제한사항

- 1 ≤ balls ≤ 30
- 1 ≤ share ≤ 30
- 구슬을 고르는 순서는 고려하지 않습니다.
- share ≤ balls

## 솔루션 코드

#### Review Code
- 시간복잡도: O(n)
```java
class Solution {
    public long solution(int balls, int share) {
        long result = 1;

        for (int i = 1; i <= share; i++) {
            result *= (balls - i + 1);
            result /= i;
        }

        return result;
    }
}
```
#### Concept

- n C r = n! / (r! * (n - r)!)
- C(n, r) = n(n-1)...(n-r+1) / r!