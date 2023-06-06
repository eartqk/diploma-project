from elasticsearch import Elasticsearch

from fastapi import HTTPException

from sciencelink.settings import settings


class SearchService:
    def __init__(self):
        self.es = Elasticsearch(
            "http://localhost:9200",
            basic_auth=(settings.es_user, settings.es_password),
        )

    def index_post(self, index_name, post_id, user_id, body):
        post_data = {
            'post_id': post_id,
            'user_id': user_id,
            'body': body
        }

        try:
            response = self.es.index(index=index_name, id=post_id, body=post_data)
            return response
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error indexing post: {str(e)}")

    def update_post(self, index_name, post_id, body):
        update_data = {
            'doc': {
                'body': body
            }
        }

        try:
            response = self.es.update(index=index_name, id=post_id, body=update_data)
            return response
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error updating post: {str(e)}")

    def search_posts(self, index_name, query):
        search_body = {
            'query': {
                'match': {
                    'body': query
                }
            }
        }

        try:
            response = self.es.search(index=index_name, body=search_body)
            return response['hits']['hits']
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error searching posts: {str(e)}")
