export async function getKoreanAddress(latitude: number, longitude: number): Promise<string> {
    const apiKey = process.env.REACT_APP_KAKAO_REST_API_KEY; // 여기에 발급받은 API 키를 입력하세요
    const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;
    
    try {
        const response = await fetch(url, {
          headers: {
            'Authorization': `KakaoAK ${apiKey}`
          }
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch address');
        }
    
        const data = await response.json();
        if (data.documents && data.documents.length > 0) {
          const addressInfo = data.documents[0].address.region_2depth_name;
          const cityName = addressInfo.split(' ')[0];
          return cityName;
        } else {
          return '주소를 찾을 수 없습니다.';
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        throw error;
      }
    }