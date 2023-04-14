# from fastapi import APIRouter, Depends
# from fastapi.security import OAuth2PasswordRequestForm
#
# from ..models.auth import User
# from ..services.auth import AuthService, get_current_user

# router = APIRouter(
#     prefix='/user',
#     tags=['user'],
# )


# @router.get('/me', response_model=User)
# def sign_up(
#         user_data: UserCreate,
#         service: AuthService = Depends(),
# ):
#     return service.register_new_user(user_data)